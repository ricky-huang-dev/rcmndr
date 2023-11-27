import useUpdateTitle from '../../hooks/useUpdateTitle'

function MySongs() {
  useUpdateTitle('MySongs')
  return (
    <div>
      <h1>My Songs</h1>
      <iframe
        title="Here In Spirit"
        className="p-4"
        src="https://open.spotify.com/embed/track/6ICdz2wvVMDC4u801OwHA2?utm_source=generator"
        width="100%"
        height="152"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  )
}

export default MySongs
