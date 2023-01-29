import { Suspense } from 'react';

import LinearProgressLoader from '../LinearProgressLoader';

const Loadable = (Component: React.FC, Loader: React.FC = LinearProgressLoader) => (props: any) =>
(
    <Suspense fallback={<Loader />}>
        <Component {...props} />
    </Suspense>
);

export default Loadable;
