import CreditUsage from "./components/CreditUsage";
import Inspiration from "./components/Inspiration/Inspiration";
import ProjectBoost from "./components/ProjectBoost";
import Projects from "./components/Projects";
import WhatisNew from "./components/WhatIsNew";

const Welcome = () => {
  return (
    <>
      <CreditUsage />
      <Projects />
      <WhatisNew />
      <Inspiration />
      <ProjectBoost />
    </>
  );
};

export default Welcome;
