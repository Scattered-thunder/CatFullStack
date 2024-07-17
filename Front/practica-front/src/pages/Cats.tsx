import Grid from '@mui/material/Unstable_Grid2/Grid2'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Cat } from '../models/Cat'
import { useEffect, useState } from 'react'
import { addCats, deleteCat } from '../redux/slices/catSlice'
import { fetchAllCats, removeCat } from '../services/cat'
import CatEditor from '../components/CatEditor'

export default function Cats() {

    const cats = useSelector((state: RootState) => state.cat.cats);
    const dispatch = useDispatch();

    const emptyCat: Cat = {
        id: 0,
        name: "",
        color: "",
        age: 0,
        img: null,
        base64img: ""
    };

    const [selectedCat, setSelectedCat] = useState<Cat>(emptyCat);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const getCats = async () => {
            try {
                const response = await fetchAllCats();
                if (response) {
                    dispatch(addCats(response));
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (cats.length === 0) {
            getCats();
        }
    }, [cats.length, dispatch]);

    const handleEdit = (id: number) => {
        const cat = cats.find((cat) => cat.id === id);
        if (cat) {
            setSelectedCat(cat);
            setIsModalOpen(true);
        }
    };

    const handleDelete = async (id: number) => {
        const cat = cats.find((cat) => cat.id === id);
        if (cat) {
            dispatch(deleteCat(cat.id));
            await removeCat(cat.id);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAdd = () => {
        setSelectedCat(emptyCat);
        setIsModalOpen(true);
    };

    return (
        <>
            <Typography variant="h3" align="center" gutterBottom>Harry´s Database Cats</Typography>
            <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} direction="column"
                justifyContent="center"
                alignItems="center">
                <Grid md={6} sx={{ minWidth: 470 }}>
                    {cats.map((cat) => (
                        <Card variant="outlined" key={cat.id} sx={{ margin: 2 }}>
                            <CardMedia sx={{ height: 140 }} image={cat.img !== null ? (cat.img instanceof Blob ? URL.createObjectURL(cat.img) : "data:image/jpeg;base64," + ((cat.base64img ?? "").replace("data:image/jpeg;base64,", ""))) : './src/assets/NoCatImage.jpg'} title="Cat Image" />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Cat N° {cat.id}
                                </Typography>
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary="Name:"
                                            secondary={cat.name}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Color:"
                                            secondary={cat.color}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Age"
                                            secondary={cat.age}
                                        />
                                    </ListItem>
                                </List>
                            </CardContent>
                            <CardActions>
                                <Button size="small" variant='contained' color='primary' onClick={() => handleEdit(cat.id)}>Edit</Button>
                                <Button size="small" variant='contained' color="error" onClick={() => handleDelete(cat.id)}>Delete</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Grid>
            </Grid>
            <Button variant="contained" color="success" sx={{ margin: 2 }} onClick={handleAdd}>Add Cat</Button>
            {selectedCat && <CatEditor Open={isModalOpen} onClose={handleCloseModal} toEditCat={selectedCat} setEditedCat={setSelectedCat} />}
        </>
    )
}

/*
const cats_mock = [
    {
        id: 1,
        name: "Wunkus",
        color: "Orange",
        age: 3
    },
    {
        id: 2,
        name: "Freakus",
        color: "Orange",
        age: 5

    },
    {
        id: 3,
        name: "Punkus",
        color: "Orange",
        age: 2
    }
];
*/