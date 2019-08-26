import React from 'react';
import { Card, withStyles, CardMedia, CardActionArea, CardContent, Typography } from '@material-ui/core';
import classNames from 'classnames';
import styles from '../styles/styles';
import { checkcard } from '../utils/httpUtil';

const style = {
    camcard: styles.camcard,
    cardimg: styles.cardimg,
};

class CamCard extends React.Component {

    render() {
        const { children, custom, classes, className, img, Title, Description } = this.props;

        return(
            <div> 
                <Card className={classNames(classes.camcard, className)}
                {...custom}>
                    <CardActionArea 
                    onClick={() => {
                        var imgstring = img.split(',');
                        checkcard({b64img: imgstring[1]}).then((resData) => {
                            console.log(resData.data.data.notes)
                        });
                        }}
                    >
                        <CardMedia className={classes.cardimg} image={img} />
                        <CardContent>
                            <Typography gutterBottom variant='h5' component='h2'>
                                {Title}
                            </Typography>
                            <Typography variant='body2' color='textSecondary' component='p'>
                                {Description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    {children}
                </Card>
            </div>
        )
    }
};

export default withStyles(style)(CamCard);