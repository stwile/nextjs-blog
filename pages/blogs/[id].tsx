import React from 'react'
import { Content } from '../../types/content';
import { Tag } from '../../types/tag';
import ReactMarkdown from 'react-markdown'

const BlogId = ({ content }) => {
console.log(content.body);
  return (
    <div>
      <h1>{content.title}</h1>
      <div>
        {content.tags.map((tag: Tag) => (
          <React.Fragment key={tag.id}>
            <span>{tag.name}</span>
          </React.Fragment>
        ))}
      </div>
      <ReactMarkdown source={content.body} skipHtml={true} />
    </div>
  );
};

export const getStaticPaths = async () => {
  const key = {
    headers: {
      'X-API-KEY': process.env.API_KEY
    },
  };

  const url = `${process.env.ENDPOINT}/blog`;
  const res = await fetch(url, key);

  const repos = await res.json();

  const paths = repos.contents.map((item: Content) => `/blogs/${item.id}`); 
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async (context: { params: { id: any; }; }) => {
  const id = context.params.id;

  const key = {
    headers: {
      'X-API-KEY': process.env.API_KEY,
    },
  };

  const url = `${process.env.ENDPOINT}/blog/${id}`;
  const res = await fetch(url, key);
  const content = await res.json();

  return {
    props : {
      content,
    }
  };
};

export default BlogId;