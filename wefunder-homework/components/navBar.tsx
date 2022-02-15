import * as React from "react";
import { useRouter } from 'next/router'

const NavBar: React.FC = () => {
    var uploadNav;
    var deckNav;
    const router = useRouter();
    switch(router.pathname) {
        case "/":
            uploadNav = <a className="nav-link disabled" href="#" aria-disabled="true">Upload</a>;
            deckNav = <a className="nav-link active text-light" aria-current="page" href="http://localhost:3000/pitchDeck">View Deck</a>
            break;
        case "/pitchDeck":
            uploadNav = <a className="nav-link active text-light" href="http://localhost:3000/" aria-disabled="true">Upload</a>;
            deckNav = <a className="nav-link disabled" aria-current="page" href="#">View Deck</a>
            break;
        default:
            break;
    }
    return (
      <ul className="nav justify-content-end bg-dark">
        <li className="nav-item">
            {uploadNav}
        </li>
        <li className="nav-item">
            {deckNav}
        </li>
      </ul>
    );
}

export default NavBar;