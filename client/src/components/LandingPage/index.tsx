import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { Grid, useMediaQuery, Typography, Button } from '@material-ui/core';

import { useStyles } from './styles';

const LandingPage = () => {

    const isTabletorMobile = useMediaQuery('(max-width: 600px)');
    const classes = useStyles();
    const container = useRef<any>(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../assets/HomeSvg.json')
        })
    }, []);

    return (
        <div className={classes.background}>
            <Grid container justifyContent="center" alignItems="center" direction={isTabletorMobile?'column-reverse':'row'}>
                <Grid item xs={12} sm={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant='h3' gutterBottom className={classes.title}>
                        Certy <br/>
                        IIT Dharwad
                    </Typography>
                    <br/>
                    <Typography variant='h6' gutterBottom className={classes.content}>
                        Sed ipsam enim quo suscipit distinctio vel porro cupiditate ut quia autem sit beatae voluptatem aut consequatur voluptate id porro maxime. Aut quas quibusdam et repellat dolor est aspernatur quos ut repudiandae aspernatur ut voluptatibus itaque est ducimus exercitationem ea doloribus ducimus.
                    </Typography>
                    <Button variant="outlined" size="large" className={classes.button}>Let's go</Button>
                </Grid>
                <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className={classes.container} ref={container}/>
                </Grid>
            </Grid>
        </div>
    )
};

export default LandingPage;
