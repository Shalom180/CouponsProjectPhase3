import { Box } from "@mui/system";
import "./SideFilterMenu.css";

export function SideFilterMenu(): JSX.Element {
    return (
        <div className="SideFilterMenu">
			<Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
        bgcolor: 'secondary.main',
        borderRadius: '8px',
        boxShadow: 3,
        p: 2,
        m: 2
      }}>
            
            </Box>
        </div>
    );
}
