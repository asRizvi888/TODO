import React from "react";
import { Paper, Container, Typography, TextField, Button, Stack, Box, Divider, Grid } from "@mui/material";
import CheckboxListItem from "./List";
import firebaseApp from "./firebase";
import {collection, addDoc, getFirestore} from "firebase/firestore";

const bg = 'https://images.wallpaperscraft.com/image/single/gradient_blur_abstraction_157512_1920x1080.jpg';

function App () {
  
  const addData = async (item) => {
    const db = getFirestore(firebaseApp);
    await addDoc(collection(db, "items"), item);
  }

  const [task, setTask] = React.useState({});
  
  const onChangeText = (e) => {
    const data = e.target.value;

    const activity = {
      task: data,
      status: false
    };

    setTask(activity);
  };

  return (
    <div style={{
      position: 'absolute',
      top: 0, bottom: 0, left: 0, right: 0,
      backgroundImage: `url(${bg})`,
      backgroundRepeat: 'no-repeat',
      alignItems: 'center', justifyContent: 'center'
    }}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        minHeight={"100vh"}
      >
      <Container style={{paddingBlock: 15}}>
      <Paper elevation={16} >
        <Container style={{paddingBlock: 10}}>
          <Typography variant="h4" textAlign={'center'} fontWeight="700" color={"cornflowerblue"}>
            TODO
          </Typography>
        </Container>
        <Container>
          <Stack spacing={2} direction={'row'} alignItems={'center'} justifyContent={'space-between'} style={{paddingBlock: 20}}>
              <Box width={"90%"}>
                <TextField 
                  id="outline-basic" 
                  label="Task" 
                  variant="outlined" 
                  value={task.task} 
                  onChange={onChangeText} 
                  fullWidth required
                />
              </Box>
              <Button 
                variant = "contained" 
                size="large" 
                disabled = {!task.task ? true : false}
                onClick={()=>(
                  addData(task)
                )}
              >CREATE</Button>
          </Stack>
        </Container>
        <Divider /> 
        <Box style={{paddingBlock: 10}}>
          <CheckboxListItem />
        </Box>
      </Paper>
      </Container>
      </Grid>
    </div>
  );
}

export default App;
