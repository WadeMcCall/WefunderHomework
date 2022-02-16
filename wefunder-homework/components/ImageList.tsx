
// convenience type to hold image properties
export type iImage = {
  src: string,
  dimensions: {width:number, height:number}
}

type imageListProps = {
  images: iImage[]
}

const ImageList: React.FC<imageListProps> = props => {
    const images = props.images.map((image) => {
      return (
        <img 
          src={"/" + image.src}
          key={image.src}
          className="img-fluid"
          height={image.dimensions.height}
          width={image.dimensions.width}
        />);
    });
    return <div>{images}</div>;
}

export default ImageList;