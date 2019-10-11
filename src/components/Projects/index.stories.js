import React from 'react';
import {storiesOf} from '@storybook/react';

import Projects from '.';

storiesOf('Projects', module)
    .add('Default', () => (
        <Projects />
    ));