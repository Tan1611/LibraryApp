/* eslint-disable unused-imports/no-unused-imports */
// import { faker } from '@faker-js/faker';
import { useLocation } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
/* eslint-disable no-unused-vars */
import { lazy, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { ref, get, child, getDatabase } from 'firebase/database';

import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { usePathname } from 'src/routes/hooks';

import { auth } from 'src/firebase';
import { users } from 'src/_mock/user';
import { posts } from 'src/_mock/blog';
import { getMe } from 'src/app/userReducer';

import Iconify from 'src/components/iconify';

import PostCard from 'src/sections/blog/post-card';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';

export const BlogPage = lazy(() => import('src/pages/blog'));

// ----------------------------------------------------------------------

export default function AppView() {
  const location = useLocation();
  // const currentUser = useSelector((state) => state.auth.currentUser);
  // const [data, setData] = useState({
  //   id: '',
  //   email: '',
  //   username: '',
  // });
  const dispatch = useDispatch();
  
  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(auth,async (user) => {
      if (!user) {
        // user logs out, handle something here
        console.log('User is not logged in');
        return;
      }
      try {
        const actionResult = await dispatch(getMe());
        const currentAuthUser = unwrapResult(actionResult);
        console.log('Logged in user: ', currentAuthUser);
      } catch (error) {
        console.log('Failed to login ', error.message);
        // show toast error
      }
    });
    return () => unregisterAuthObserver();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Welcome👋👋👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total books"
            total={7000}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/book.svg"/>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Reader"
            total={users.length}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Borrowing"
            total={5}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/reader.svg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Messages"
            total={2}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/message.svg" />}
          />
        </Grid>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            mt: 2,
          }}
        >
          <Typography variant="h4">Blog</Typography>

          {/* <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Post
        </Button> */}
        </Stack>
        <Grid container spacing={3} mt={3}>
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
