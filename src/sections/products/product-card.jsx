/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

// eslint-disable-next-line unused-imports/no-unused-imports
import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
// eslint-disable-next-line unused-imports/no-unused-imports
import Iconify from 'src/components/iconify';
// import { ColorPreview } from 'src/components/color-utils';

// ----------------------------------------------------------------------

export default function ShopProductCard({ product }) {
  console.log(product);
  // eslint-disable-next-line no-unused-vars
  const renderStatus = (
    <Label
      variant="filled"
      color={(product.status === 'sale' && 'error') || 'info'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {/* {product.status} */}
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product.cover}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );


  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {/* {product.status && renderStatus} */}

        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.name}
        </Link>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill"/>}>Borrow</Button>
        </Stack>
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
