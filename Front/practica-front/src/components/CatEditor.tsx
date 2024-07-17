import React from 'react'
import { Cat } from '../models/Cat';
import Modal from '@mui/material/Modal/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { createCat, editCat } from '../services/cat';
import { addCat, updateCat } from '../redux/slices/catSlice';
import { styled } from '@mui/material/styles';

interface CatEditorProps {
    Open: boolean;
    onClose: () => void;
    toEditCat: Cat;
    setEditedCat: React.Dispatch<React.SetStateAction<Cat>>;
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function CatEditor(
    { Open, onClose, toEditCat, setEditedCat }: Readonly<CatEditorProps>
) {

    const dispatch = useDispatch();

    const newCat = toEditCat.id == 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedCat((previousState: any) => ({
            ...previousState,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files?.[0];

            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                const base64String = loadEvent.target?.result;
                setEditedCat((previousState: any) => ({
                    ...previousState,
                    base64img: base64String,
                    img: base64String,
                }));
            };
            reader.readAsDataURL(file);
            console.log(toEditCat);
        }
    };

    const handleSave = async () => {
        if (newCat) {
            try {
                const newCat = await createCat(toEditCat);
                toEditCat.id = newCat.id;
                dispatch(addCat(toEditCat));
            } catch (error: any) {
                console.error(error.toString());
            }
        } else {
            try {
                await editCat(toEditCat.id, toEditCat);
                dispatch(updateCat(toEditCat));
            } catch (error: any) {
                console.error(error.toString());
            }
        }
        onClose();
    }

    return (
        <Modal
            open={Open}
            onClose={onClose}
            aria-labelledby="cat-editor"
            aria-describedby="modify-add-cat"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography id="modal-title" variant="h5" component="h2" sx={{ color: "black" }} gutterBottom>
                    Edit Cat
                </Typography>
                <Box sx={{
                    maxWidth: '250',
                    maxHeight: '250',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 2,
                }}>
                    <img src={toEditCat.img !== null ? (toEditCat.img instanceof Blob ? URL.createObjectURL(toEditCat.img) : toEditCat.base64img) : './src/assets/NoCatImage.jpg'} alt='' style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        display: 'block',
                    }} />
                </Box>
                <TextField
                    fullWidth
                    name="name"
                    label="Name"
                    value={toEditCat.name}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    name="color"
                    label="Color"
                    value={toEditCat.color}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    name="age"
                    label="Age"
                    type='numeric'
                    value={toEditCat.age}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" onClick={handleSave}>
                    Guardar
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    onClick={onClose}
                    sx={{ ml: 2 }}
                >
                    Cancelar
                </Button>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    sx={{ ml: 2 }}
                >
                    Upload image
                    <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                </Button>
            </Box>
        </Modal>
    );
}
