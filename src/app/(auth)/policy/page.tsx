import { ContainerMaxWind } from "@/components";

import React from "react";

type Props = {};

const PolicyPage = (props: Props) => {
  return (
    <div>
      {/* <GeustNav  /> */}
      <ContainerMaxWind className="space-y-8 leading-relaxed px-8 max-w-screen-md">
        <h1 className="text-4xl font-semibold">Policy Table of Contents</h1>
        <h2 className="text-lg font-semibold">Privacy Policy</h2>
        <p>
          Protecting your privacy is important to us. Accordingly, we’re
          providing this Privacy Policy to explain our practices regarding the
          collection, use and disclosure of information that we receive when you
          use our Services (as defined in our Terms of Service). This Privacy
          Policy applies only to those websites, services and applications
          included within “Services” and doesn’t apply to any third-party
          websites, services or applications, even if they are accessible
          through our Services. Also, please note that, unless we define a term
          in this Privacy Policy, all capitalized words used in this Privacy
          Policy have the same meanings as in our Terms of Service. Read the
          full text
        </p>
        <h2>Terms of Service</h2>
        <p>
          Welcome to the chatCentral (“chatCentral”) website
          (www.chatCentral.com) (the “Site”). Please read these Terms of Service
          (the “Terms”) carefully because they govern your use of our Site and
          our design tool services accessible via our Site. To make these Terms
          easier to read, the Site and our services are collectively called the
          “Services.” Read the full text
        </p>
        <p>chatCentral Copyright & Intellectual Property Policy</p>
        <p>
          chatCentral, Inc. (“chatCentral”) respects the intellectual property
          rights of others and expects its users to do the same.
        </p>
      </ContainerMaxWind>
    </div>
  );
};

export default PolicyPage;
