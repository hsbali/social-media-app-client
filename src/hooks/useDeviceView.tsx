import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function useDeviceView() {
    const theme = useTheme();
    const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
    const isTabletView = useMediaQuery(theme.breakpoints.down('md'));
    const isDesktopView = useMediaQuery(theme.breakpoints.up('md'));

    return { isMobileView, isTabletView, isDesktopView };
}