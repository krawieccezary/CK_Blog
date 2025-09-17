import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { StaticImage } from "gatsby-plugin-image";

import ContactForm from "../components/ContactForm";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Message from '../components/Message';

const Contact = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const [isSuccess, setIsSuccess] = useState(false);
  const [userName, setUserName] = useState('');

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Kontakt" />
      {isSuccess ? (
        <Message content={`${userName}, dzięki za wiadomość! Wkrótce odpowiem.`}>
          <StaticImage src='../images/mail-sent.svg' width={400} alt="Error"/>
        </Message>
      ) : (
        <div>
          <h1>Kontakt</h1>
          <p>Jeśli masz pytanie, komentarz lub pomysł, napisz do mnie. Postaram się pomóc.</p>
          <ContactForm onSuccess={() => setIsSuccess(true)} setUserName={setUserName} />
        </div>
      )}
    </Layout>
  )
}

export default Contact;


export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`