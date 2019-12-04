import React from 'react';
import {storiesOf} from '@storybook/react';

import QueryTest from '.';

storiesOf('QueryTest', module)
    .add('Default', () => (
        <QueryTest />
    ));