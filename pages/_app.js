import '../app/globals.css'
import Navbar from './Navbar';
export default function App({ Component, pageProps }) {
    return <>
    <Navbar/>
    <div>
    <Component {...pageProps} />
    </div>
    </>;
  }
  