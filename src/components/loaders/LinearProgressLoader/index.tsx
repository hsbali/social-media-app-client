import { Box, LinearProgress, styled } from '@mui/material';

const LoaderWrapper = styled(Box)({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1301,
    width: '100%'
});

export default function LinearProgressLoader() {
    return (
        <LoaderWrapper>
            <LinearProgress />
        </LoaderWrapper>
    )
};
