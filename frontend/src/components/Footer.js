import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitterSquare, faFacebook, faGoogle} from "@fortawesome/free-brands-svg-icons";
import { faUserLock, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <div>
      <div
          class="row d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5" style={{"backgroundColor":"#e3f2fd"}}>
          {/* <!-- Copyright --> */}
          <div class="mb-3 md-0">
            Copyright © 2022. All rights reserved.
          </div>
          {/* <!-- Copyright -->

          <!-- Right --> */}
          <div>
            <a href="#!" class=" me-4">
            <FontAwesomeIcon icon={ faFacebook}/>
            </a>
            <a href="#!" class=" me-4">
            <FontAwesomeIcon icon={ faTwitterSquare}/>
            </a>
            <a href="#!" >
              <i class="fab fa-google"></i>
            </a>
            <a href="#!" >
            <FontAwesomeIcon icon={ faGoogle}/>
            </a>
          </div>
          {/* <!-- Right --> */}
        </div>
    </div>
  )
}

export default Footer
