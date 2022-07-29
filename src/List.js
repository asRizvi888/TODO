import * as React from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemButton,
    ListItemText,
    Checkbox,
    Button,
} from '@mui/material';
import firebaseApp from './firebase';
import { 
    collection, 
    doc, 
    getDocs, 
    getFirestore, 
    setDoc, 
    deleteDoc
} from 'firebase/firestore';

const CheckboxListItem = () => {

    const [checked, setChecked] = React.useState([]);
    const db = getFirestore(firebaseApp);
    
    React.useEffect(()=>{
        const retriveData = () => {
            const itemRef = collection(db, 'items');
            getDocs(itemRef)
                .then(res => {
                    const dbData = res.docs.map(item => ({
                        id: item.id,
                        data: item.data()
                    }));
                    setChecked(dbData);
                })
                .catch(e => {
                    console.error(e);
                })
        } 
    
        retriveData();
    },[checked]);

    const handleToggle = async (value) => {
        const currentIndex = checked.indexOf(value);

        checked[currentIndex].data.status = !checked[currentIndex].data.status;

        const curr = checked[currentIndex];
        await setDoc(doc(db, 'items', curr.id), curr.data);
    };

    const deleteItem = async (value) => {
        const currentIndex = checked.indexOf(value);
        const item = checked[currentIndex].id;

        await deleteDoc(doc(db, 'items', item));
    }

    return (
       <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: 400, overflow:"auto"}}>
        {checked.map((value) => {
        const labelId = `${value.id}`;

        return (  
        <ListItem
            key={labelId}
            style={{ textDecoration : value.data.status ? 'line-through' : 'none'}} 
            secondaryAction={
                <Button variant={'contained'} color="error" onClick={deleteItem(value)}>
                    Delete
                </Button>
            }
        >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                <ListItemIcon>
                <Checkbox
                    color='success'
                    edge="start"
                    checked={value.data.status}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                />
                </ListItemIcon>
                <ListItemText primary={`${value.data.task}`} />
            </ListItemButton>
        </ListItem>
      )})}
    </List>
    );
}

export default CheckboxListItem;