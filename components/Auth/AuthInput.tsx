import { styled, TextField } from "@mui/material";

const AuthInput = styled(TextField)({
    '& label': {
        color: 'rgb(163, 163, 163)',
    },
    '& label.Mui-focused': {
        color: 'rgb(236, 236, 236)',
    },
    '& input': {
        color: 'rgb(163, 163, 163)',
        '&:focus': {
            color: 'rgb(236, 236, 236)',
        }
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'rgb(138, 138, 138)',
        },
        '&:hover fieldset': {
            borderColor: 'rgb(138, 138, 138)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'rgb(7, 207, 57)',
        },
    }
});

export default AuthInput;