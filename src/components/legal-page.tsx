import React from 'react'
interface LegalPageProps {
    title: string;
    lastUpdated: string;
    paragraph: React.ReactNode;
    content: { title: string; content: React.ReactNode}[];
}
function LegalPage({
    title,
    lastUpdated,
    paragraph,
    content,
}:LegalPageProps ) {
  return (
<section className="text-center text-secondary mt-32">
      {/* Trust Badge */}
      <h2
        className=" 
        my-8 max-w-lg mx-auto
        animate-fade-in-down   
        px-6 py-3 
        bg-secondary
       
        rounded-full text-xl"
      >
        <span className="bg-text bg-gradient capitalize"> {title} </span>
      </h2>

      <p>
        <span className=" ">Last updated:</span>
        <span className="bg-text bg-gradient">{lastUpdated}</span>
      </p>
      <div
        className=" 
        container max-w-3xl mx-auto space-y-5   
      "
      >
        <h1
          className=" text-6xl bg-gradient bg-text
 
        "
        >
          {title}
        </h1>
        <p className=" text-ms leading-normal font-extralight ">
          {paragraph}
        </p>

        <div className=" space-y-7 ">
          {content.map((section) => (
            <div key={section.title} className="  space-y-2">
              <h3 className=" text-3xl font-bold">{section.title}</h3>
              <p className=" text-muted-foreground">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>  )
}

export default LegalPage