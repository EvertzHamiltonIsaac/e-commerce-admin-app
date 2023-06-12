import React from 'react';

/**
 * Props of Login Container
 * @typedef {Object} ILoginContainer
 * @property {string} image
 * @property {string} title
 * @property {string} rightMessageTitle
 * @property {string} rightMessage
 * @property {number} widthImage
 * @property {string} backgroundColor
 * @property {ReactNode} children 
 */

/**
 * Calling the JsDoc Interface
 * @param {ILoginContainer} props - reference to props of LoginContainer
 */

const LoginContainer = ({ children, image, title, rightMessageTitle, rightMessage, widthImage = 185, backgroundColor = "#eee" }) => {
  // console.log(rightMessageTitle);
  return (
    <article className="h-100 gradient-form" style={{ backgroundColor: backgroundColor, minHeight: '100vh' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src={`${image}`}
                        style={{ width: widthImage }}
                        alt=""
                      />
                      <h4 className="mt-1 mb-4 pb-1">{title}</h4>
                    </div>
                    {children}
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center justify-content-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.9em'}}>
                    <div style={{width: '250px', backgroundColor: 'white', borderRadius: '1em'}}>
                      <img  style={{width:'100%'}} src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" alt="logo" />
                    </div>
                    <h4 className="mb-4">{rightMessageTitle}</h4>
                    <p className="small mb-0 text-center">
                      {rightMessage}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default LoginContainer