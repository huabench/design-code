import React from 'react'
import { Helmet } from 'react-helmet'
import Header from '../components/Header'
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import './layout.css'
import Footer from './Footer'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
      allContentfulLink(sort: {fields: [createdAt], order: ASC}){
        edges{
          node{
            title
            url
            createdAt
          }
        }
      }
    }
  `)
  return (
    <>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: "description", content: data.site.siteMetadata.description },
          { name: "keywords", content: data.site.siteMetadata.keywords }
        ]}
      />
      <Header />
      <div style={{
        margin: '0 auto',
        position: 'relative'
      }}
      >
        {children}
      </div>
      <Footer data={data}>
        Backgrounds made in Cinema 4d, ios app in Swift, site in React. <a href="huabench@163.com">Email us</a> to anything. © 2020
      </Footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
