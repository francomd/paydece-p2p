import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`}
            async
          />
          {/* <!-- Google Tag Manager --> */}
          <script
            id="tag-manager-script"
            // dangerouslySetInnerHTML={{
            //   __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            //   new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            //   j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            //   'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            //   })(window,document,'script','dataLayer','GTM-PBMNWG9');`
            // }}
          />
          {/* <!-- End Google Tag Manager --> */}
        </Head>
        <body>
          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript>
            {/* <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-PBMNWG9"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="google-tag-manager"
            ></iframe> */}
          </noscript>
          {/* <!-- End Google Tag Manager (noscript) --> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
