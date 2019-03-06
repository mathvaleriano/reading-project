import React from 'react';
import { Dimmer, Loader as SUILoader } from 'semantic-ui-react';

const Loader = () => (
  <Dimmer active inverted>
    <SUILoader size="large">
      Loading
    </SUILoader>
  </Dimmer>
);

export default Loader;
