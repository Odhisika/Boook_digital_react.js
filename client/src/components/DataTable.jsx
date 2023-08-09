import React from 'react'
import MaterialTable from "material-table"
import { ThemeProvider, createTheme } from '@mui/material';

const DataTable = ({ columns,  data, title, actions}) => {
    const defaultMaterialTableTheme = createTheme();
  return (
    <div>
       <ThemeProvider theme={defaultMaterialTableTheme}>
        <MaterialTable
        columns={columns}
        
        data={data}
        title={title}
        actions={actions}
        />

       </ThemeProvider>
    </div>
  )
}

export default DataTable