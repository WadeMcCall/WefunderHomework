import * as React from "react";
import Image from 'next/image'

export type pitchDeckImageProps = {
    file: string;
}



const PitchDeckImage: React.FC<{props: pitchDeckImageProps}> = ({props}) => {
    return (
        <Image
            src={props.file}
        >
        </Image>
    );
}

export default PitchDeckImage;