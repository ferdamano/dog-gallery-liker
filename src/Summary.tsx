import { FC, useState, useEffect, useMemo, useCallback } from 'react'
import { connect } from 'react-redux'
import { IDog } from './Dog'
import { searchSummary } from './actions'

const styles: any = {
  height: '100%',
  left: 0,
  margin: '10px 0 60px',
  overflowX: 'hidden',
  padding: '0 20px 60px',
  position: 'fixed',
  top: 0,
  zIndex: '1',
  width: '15vw'
}

interface Props {
  breeds: IDog[]
  searchToken: string
  searchSummary: any
}

type BreedInfo = {
  name: string
  count: number
  likes: number
}

const Summary: FC<Props> = ({ breeds, searchToken, searchSummary }) => {
  const [breedInfo, setBreedInfo] = useState<BreedInfo[] | undefined>(undefined)

  useEffect(() => {
    if (breeds && breeds.length) {
      const breedInfo: BreedInfo[] = breeds.reduce((acc: BreedInfo[], cur: IDog) => {
        const breedIndex: number = acc.findIndex((currentValue: BreedInfo) => {
          return currentValue.name === cur.name
        })
        const breed: BreedInfo = acc[breedIndex]
        let ret: BreedInfo = {
          name: cur.name,
          count: 1,
          likes: cur.likes
        }
        if (breed) {
          ret = {
            ...ret,
            count: breed.count + 1,
            likes: breed.likes + cur.likes
          }
          acc[breedIndex] = ret
        } else {
          acc.push(ret)
        }
        return acc
      }, [])
      setBreedInfo(
        breedInfo.sort(function (a, b) {
          var textA = a.name.toUpperCase()
          var textB = b.name.toUpperCase()
          return textA < textB ? -1 : textA > textB ? 1 : 0
        })
      )
    }
  }, [breeds, searchToken])

  return (
    <div style={styles}>
      <div style={{ margin: '10px 1rem 0', marginBottom: '30px', width: 'calc(100% - 2rem)' }}>
        <label htmlFor="searchSummary" style={{ marginBottom: '10px' }}>
          Look for:
        </label>
        <input
          id="searchSummary"
          type="text"
          onChange={e => {
            searchSummary(e.target.value)
          }}
        />
      </div>
      {breedInfo &&
        breedInfo
          .filter((a: BreedInfo) => {
            return a.name.toLowerCase().includes(searchToken.toLowerCase())
          })
          .map((info: BreedInfo, id: number) => {
            const { name, count, likes } = info
            return (
              <div key={`info-${id}-${name}`} style={{ margin: '0 auto', padding: '1rem' }}>
                <h2>{name}</h2>
                <p>count: {count}</p>
                <p>likes: {likes}</p>
              </div>
            )
          })}
    </div>
  )
}

const mapReduxStateToProps = (state: any) => {
  return {
    breeds: state.breeds,
    searchToken: state.searchToken
  }
}

const mapReduxDispatchToProps = (dispatch: any) => ({
  searchSummary: (token: string) => {
    dispatch(searchSummary(token))
  }
})

export default connect(mapReduxStateToProps, mapReduxDispatchToProps)(Summary)
