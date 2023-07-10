import * as React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  CssBaseline,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link,NavLink,useNavigate } from "react-router-dom";
import axios from "axios";

const drawerWidth = 240;
function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const navigate = useNavigate();
  const handleLogout =async () =>{
    try {
      await axios.delete('users/sign_out');
      localStorage.clear();
      navigate("/login");
    } catch(error) {
       console.log(error)   
    }
  }
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
    React.useEffect(()=>{
      const checkAdmin=JSON.parse(localStorage.getItem("userRole"))
      // console.log("checkAdmin",checkAdmin)
      // console.log("checkAdmin type",typeof checkAdmin)
      setIsAdmin(checkAdmin)
    },[])
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        HR Portal
      </Typography>
      <Divider sx={{marginBottom:2}}/>
      <Stack direction="column" spacing={2}>
      {
        isAdmin && <Link to="/add">
        <Typography>Add User</Typography>
      </Link>
      }
      {
        isAdmin && <Link to="/users">
        <Typography>User List</Typography>
      </Link>
      }
      {
        isAdmin && <Link to="/set_deduction">
        <Typography>Payroll</Typography>
      </Link>
      }
      {
        isAdmin && <Link to="/add_company">
        <Typography>Company</Typography>
      </Link>
      }
      <Link onClick={handleLogout}>
              <Typography>Logout</Typography>
      </Link>
      </Stack>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <CssBaseline />
      <AppBar component="nav" position="fixed">
        <Toolbar className="flex items-center justify-between">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              HR Portal
            </Typography>
          </Link>
          <Box
            sx={{ display: { xs: "none", sm: "flex" } }}
            className="flex gap-5"
          >
            {
              isAdmin && <NavLink to="/add"
              className={({ isActive }) => isActive ? 'border-b-2 border-white' : '' }>
               <Typography >Add User</Typography>
             </NavLink>
            }
           {
            isAdmin &&  <NavLink to="/users"
            className={({ isActive }) => isActive ? 'border-b-2 border-white' : '' }>
              <Typography>User List</Typography>
            </NavLink>
           }
            {
              isAdmin && <NavLink to="/set_deduction"
              className={({ isActive }) => isActive ? 'border-b-2 border-white' : '' }>
                <Typography>Payroll</Typography>
              </NavLink>
            }
             {
              isAdmin && <NavLink to="/add_company"
              className={({ isActive }) => isActive ? 'border-b-2 border-white' : '' }>
                <Typography>Company</Typography>
              </NavLink>
            }
            <Link onClick={handleLogout}>
              <Typography sx={{color:'white'}}>Logout</Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
