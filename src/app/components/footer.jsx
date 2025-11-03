const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'rgb(70,130,180)', color: 'black'}} className="w-full">
        <div style={{ padding: '20px 0', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{marginLeft: '30px'}}>
            <h3 style={{ marginBottom: '10px', fontSize: '24px' }}>Follow Us</h3>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <a href=""><img src="/facebook.png" alt="Facebook" style={{ width: '40px', marginRight: '10px' }} /></a>
              <a href=""><img src="/twitter.png" alt="Twitter" style={{ width: '40px', marginRight: '10px' }} /></a>
              <a href=""><img src="/instagram.png" alt="Instagram" style={{ width: '40px' }} /></a>
            </div>
          </div>
          <div style={{ textAlign: 'right', marginRight: "40px"}}>
            <img src="/fox.png" alt="Fox" style={{ width: '100px', marginBottom: '10px' }} />
            <p style={{ fontSize: '16px', marginBottom: '0' }}>© 2024 LingoBuddy</p>
          </div>
        </div>
      </footer>
    )
  };
  
  export default Footer;