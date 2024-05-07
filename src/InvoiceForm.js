import React, { useEffect } from "react";
import {TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import { fetchInvoice, createInvoice, updateInvoice} from './InvoiceDetail';
function InvoiceForm({mode}) {
    const [formData, setFormData] = useState({
        id: '',
        customerName: '',
        invoiceDate: new Date().toISOString().slice(0,10),
        items: [],
    });
    const navigate = useNavigate();
    const { invoiceID} = useParams();

    useEffect(() => {
        if (mode == 'edit' && invoiceID) {
            const getInvoice = async () => {
                const invoice = await fetchInvoice(invoiceID);
                setFormData(invoice);
            };
            getInvoice();
        
    }
}, [mode, invoiceID]);

const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value});

};
const handleItemChange = (index, event) => {
    const {name, value} = event.target;
    const updatedItems = [...formData.items];
    updatedItems[index] = {...updatedItems[index], [name]: value};
    setFormData({...formData, items: updatedItems});
});
};
const handleRemoveItem = (index) => {
    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1);
    setFormData({...formData, items: updatedItems});
};
const handleSubmit = async (evenht) => {
    event.preventDefault();
    try{
        if(mode==='create') {
            await createInvoice(formData);
        }else {
            await updateInvoice(invoiceID, formData);
        }
        navigate('/invoices');
    } catch (error) {
        console.error(error);
    }
};
return (
    <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    name="customerName"
                    label="Customer Name"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    name="invoiceDate"
                    label="Invoice Date"
                    type="date"
                    value={formData.invoiceDate}
                    onChange={handleChange}
                    InputLabelPropsw = {{ shrink: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <h2>Items</h2>
                {formData.items.map(item, index) => (
                    <Grid key = {index} container spacing-={2} alignItems="center">
                        <Grid item xs={6}>
                            <TextField
                                name="description"
                                label="Description"
                                value={item.description}
                                onChange={(event) => handleItemChange(index, event)}
                                required
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                type="number"
                                fullwidth
                                label="Unit Price"
                                value={item.unitPrice}
                                onChange={(event) => handleItemChange(index, event)}
                                required
                            />
                        </Grid>
                        {index > 0 && (
                            <Button variant="contained"  color="error" size="small" onClick={() => handleRemoveItem(index)}>
                            Remove
                            </Button>
                        )}
                   
                )}
            </Grid>
        </Grid>
    </form>
)
