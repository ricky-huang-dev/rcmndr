// import { AddSongDraft } from '../../../types/Song'
// interface Props {
//   songDraft: AddSongDraft
// }

import { AddSongDraft } from '../../../types/Song'
import TextBox from '../UI/TextBox/TextBox'
import Button from '../UI/Button/Button'

interface Props {
  handleSubmit: (form: AddSongDraft) => void
}

function AddSong(props: Props) {
  // const { songDraft } = props
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const title = formData.get('title') as string
    const artist = formData.get('artist') as string
    const genre = formData.get('genre') as string
    const link = formData.get('link') as string
    const comments = formData.get('comments') as string

    const form = {
      title: title,
      artist: artist,
      genre: genre,
      link: link,
      comments: comments,
    }

    props.handleSubmit(form)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <div className="space-y-2">
          <label htmlFor="songtitle">Song title*</label>
          <TextBox
            type="text"
            name="songtitle"
            id="songtitle"
            required
            defaultValue="The full title of the song"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="artist">Artist*</label>
          <TextBox
            type="text"
            name="artist"
            id="artist"
            required
            defaultValue="Name of the artist / singer / group"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="genre">Genre*</label>
          <TextBox
            type="text"
            name="genre"
            id="genre"
            defaultValue="Genre of music"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="Link">Link*</label>
          <TextBox
            type="text"
            name="Link"
            id="Link"
            defaultValue="A link so others can listen (optional)"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="Comment">Comment*</label>
          <TextBox
            type="text"
            name="Comment"
            id="Comment"
            defaultValue="What do you like about this song?"
          />
        </div>
        <div className="mx-auto text-center">
          <Button>Save</Button>
        </div>
      </form>
    </div>
  )
}

export default AddSong
