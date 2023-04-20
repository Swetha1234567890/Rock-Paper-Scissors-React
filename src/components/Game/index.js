import {ListItem, Image, Button} from './styledComponents'

const Game = props => {
  const {imagesList, onClickUserOpinion} = props
  const {id, imageUrl} = imagesList

  const onClickYourImage = () => {
    onClickUserOpinion(id)
  }

  return (
    <ListItem className="list-items-container">
      <Button
        type="button"
        onClick={onClickYourImage}
        data-testid={`${id.toLowerCase()}Button`}
      >
        <Image src={imageUrl} alt={id} />
      </Button>
    </ListItem>
  )
}

export default Game
