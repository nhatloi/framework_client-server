import React from 'react';
import SimpleReactFooter from "simple-react-footer";


function Footer() {
  const description = "Fradar has a rich library of cinema movies in Vietnamese cinemas. Along with the latest news. Enjoy movies at the theater with friends and relatives anytime you want.";
  const title = "Fradar";
  const columns = [
    {
        title: "Resources",
        resources: [
            {
                name: "About",
                link: "/"
            },
            {
                name: "Careers",
                link: "/"
            },
            {
                name: "Contact",
                link: "/"
            },
            {
                name: "Admin",
                link: "/"
            }
        ]
    },
    {
        title: "Legal",
        resources: [
            {
                name: "Privacy",
                link: "/"
            },
            {
                name: "Terms",
                link: "/"
            }
        ]
    },
    {
        title: "Visit",
        resources: [
            {
                name: "Locations",
                link: "/"
            },
            {
                name: "Culture",
                link: "/"
            }
        ]
    }
 ];
  return (
    <div>
      <SimpleReactFooter 
          description={description} 
          title={title}
          columns={columns}
          linkedin="fluffy_cat_on_linkedin"
          facebook="fluffy_cat_on_fb"
          twitter="fluffy_cat_on_twitter"
          instagram="fluffy_cat_live"
          youtube="UCFt6TSF464J8K82xeA?"
          pinterest="fluffy_cats_collections"
          copyright="black"
          iconColor="black"
          backgroundColor="bisque"
          fontColor="black"
          copyrightColor="darkgrey"
      />
    </div>
  );
}

export default Footer;
