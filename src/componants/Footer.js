import React from 'react';
const Footer = () => {
  return (
<div className="main-footer">
  <div className="container">
    <div className="row">

      {/* column1 */}
      <div class="col-md-5 col-sm-6">
                    <h1>PFE ESI-SBA</h1>
                    <p>LOGO</p>
              </div>
      {/* column2 */}
      <div class="col-md-3 col-sm-12">
               		
                    <h2>INFOS</h2>
                    <ul className="links">
                        <li><a href="http://www.esi-sba.dz/fr/" >L'Ecole National d'Informatique  </a></li>
                        <li> <a href="http://moodle.esi-sba.dz/"> Site Moodle</a> </li>
                    </ul>
   
                    
               </div>
      {/* column3 */}
      <div class="col-md-4 col-sm-6">
                    <div class="footer-info">
                    	<h2>NOUS CONTACTER </h2>
                         <p>Tel/fax : +213 48 74 94 52</p>
                         <p>Email : <a href="mailto:info@esi-sba.dz">info@esi-sba.dz</a></p>
                         <p><a href="https://goo.gl/maps/oTLxtTDrXMePc28u5">Notre Lieu</a></p>
                    </div>
               </div>
      <div class="clearfix"></div>

               <div class="col-md-12 col-sm-12">
                    <div class="copyright-text">
                         <p>Copyright &copy;{new Date().getFullYear()} ESI-SBA </p>
                    </div>
               </div>

    </div>
  </div>  
</div>
  )
}

export default Footer;