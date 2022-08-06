import { FC, useState, useEffect, useMemo, useCallback } from 'react'
import { connect } from 'react-redux'
import Dog, { IDog } from './Dog'
import shortid from 'shortid'

import {
  fetchDogsStart,
  fetchDogsSuccess,
  fetchDogsFailure,
  updateBreedSuccess,
  fetchImagesStart,
  fetchImagesDone
} from './actions'

interface IDogGrid {
  dogs: IDog[]
}

interface Props {
  fetchDogsStart: any
  fetchDogsSuccess: any
  fetchDogsFail: any
  updateBreed: any
  breeds: IDog[]
  fetchedImages: boolean
  fetchingImages: boolean
  fetchImagesStart: any
  fetchImagesDone: any
  searchToken: string
}

const styles: any = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginLeft: '20vw',
  width: '100%'
}

const Grid: FC<Props> = ({
  breeds,
  fetchedImages,
  fetchingImages,
  fetchDogsStart,
  fetchDogsSuccess,
  fetchDogsFail,
  updateBreed,
  fetchImagesStart,
  fetchImagesDone,
  searchToken
}) => {
  const SIZE = 100

  const fetchImage = async (dog: IDog) => {
    const response = await fetch(`https://dog.ceo/api/breed/${dog.name}/images/random`)
    const data = await response.json()
    if (data.message) {
      updateBreed({ ...dog, image: data.message })
    }
  }

  const fetchImages = () => {
    fetchImagesStart()
    breeds.map((dog: IDog) => {
      fetchImage(dog)
    })
    fetchImagesDone()
  }

  const fetchBreeds = () => {
    fetchDogsStart()
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(response => {
        return response.json()
      })
      .catch(() => {
        fetchDogsFail()
      })
      .then(data => {
        if (data.message) {
          const pool = Object.keys(data.message)
          let i = SIZE,
            res: IDog[] = []
          while (i > 0) {
            let index = Math.floor((pool.length + 1) * Math.random())
            let breedName = pool[index]
            if (breedName) {
              res.push({
                id: shortid.generate(),
                image: '',
                likes: 0,
                name: breedName
              })
              i--
            }
          }
          fetchDogsSuccess(res)
        }
      })
  }

  useEffect(() => {
    if (breeds && !breeds.length) fetchBreeds()
    if (breeds && breeds.length && !fetchedImages && !fetchingImages) fetchImages()
  }, [breeds, fetchedImages, fetchingImages])

  return (
    <div style={styles}>
      {breeds &&
        breeds
          .filter((a: IDog) => {
            return a.name.toLowerCase().includes(searchToken.toLowerCase())
          })
          .map((dog: IDog) => {
            const { id, name, likes, image } = dog
            return (
              <Dog
                key={id}
                id={id}
                name={name}
                likes={likes}
                image={image}
                updateBreed={updateBreed}
              />
            )
          })}
    </div>
  )
}

const mapReduxStateToProps = (state: any) => {
  return {
    breeds: state.breeds,
    fetchedImages: state.fetchedImages,
    fetchingImages: state.fetchingImages,
    searchToken: state.searchToken
  }
}

const mapReduxDispatchToProps = (dispatch: any) => ({
  fetchDogsStart: () => dispatch(fetchDogsStart()),
  fetchDogsSuccess: (breeds: IDog[]) => dispatch(fetchDogsSuccess({ breeds })),
  fetchDogsFail: () => dispatch(fetchDogsFailure()),
  updateBreed: (breed: IDog) => dispatch(updateBreedSuccess({ breed })),
  fetchImagesStart: () => dispatch(fetchImagesStart()),
  fetchImagesDone: () => dispatch(fetchImagesDone())
})

export default connect(mapReduxStateToProps, mapReduxDispatchToProps)(Grid)
