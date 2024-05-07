import React, { useEffect, useState } from "react";
import {Table, Tablebody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@mui/material';
import{useNavigate} from 'react-router-dom';
import {fetchInvoices} from './InvoiceForm';

function InvoiceList() {
    const [invoices, setInvoices] = useState([]);
    const navigate = useNavigate();
    useEffect(()=> {
        const getInvoices = async () => {
            const fetchedInvoices = await fetchInvoices();
            setInvoices(fetchedInvoices);
        };
        getInvoices();
    }, []);
    const handleAddInvoice = () => {
        navigate('/invoice/create');
    };
    const handleInvoiceClick = (invoiceId) => {
        navigate('/invoices/${invoiceId}');
    };
    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleInvoiceClick}>
                Add Invoice
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minwidth: 650}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Invoice ID</TableCell>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Invoice Date</TableCell>
                            {/* Additional headers as needed */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice.id}>
                                <TableCell>{invoice.id}</TableCell>
                                <TableCell>{invoice.customerName}</TableCell>
                                <TableCell>{invoice.invoiceDate}</TableCell>
                                {/* Additional cells as needed */}
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleInvoiceClick(invoice.id)}>
                                        View Invoice
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default InvoiceList;
