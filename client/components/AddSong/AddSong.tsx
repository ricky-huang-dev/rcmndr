import { AddSongDraft } from '../../../types/Song'
import TextBox from '../UI/TextBox/TextBox'
import Button from '../UI/Button/Button'

interface Props {
  handleSubmit: (form: AddSongDraft) => void
}

function AddSong(props: Props) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const songtitle = formData.get('songtitle') as string
    const artist = formData.get('artist') as string
    const genre = formData.get('genre') as string
    const link = formData.get('link') as string
    const comments = formData.get('comments') as string

    const form = {
      title: songtitle,
      artist: artist,
      genre: genre,
      link: link,
      comments: comments,
    }

    props.handleSubmit(form)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6 pt-8">
        <div className="space-y-2">
          <label htmlFor="songtitle">Song title*</label>
          <TextBox
            type="text"
            name="songtitle"
            id="songtitle"
            required
            placeholder="The full title of the song"
            className="p-4"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="artist">Artist*</label>
          <TextBox
            type="text"
            name="artist"
            id="artist"
            required
            placeholder="Name of the artist / singer / group"
            className="p-4"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="genre">Genre*</label>
          <TextBox
            type="text"
            name="genre"
            id="genre"
            placeholder="Genre of music"
            className="p-4"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="link">Link</label>
          <TextBox
            type="text"
            name="link"
            id="link"
            placeholder="A link so others can listen (optional)"
            className="p-4"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="comments">Comment</label>
          <TextBox
            type="text"
            name="comments"
            id="comments"
            placeholder="What do you like about this song?"
            className="p-4"
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
