# Contributing to V2C
The following guidelines applies to the current developers contributing to the `v2c-dashboard`. This document will be updated as needed.

> Please follow the Quick Start Guide in the ReadMe to get the app running.

### Folder Structure
You project structure should look like this:
> \> node_modules <br/>
> \> public <br/>
> \>src <br/>
> \> . . .

Most of the contributions will be to the `src/app/` folder.

### What you should know
| Skill | Variant |
| ----- | ------- |
| HTML  | JSX     |
| CSS   | SCSS    |
| JS    |         |
| Bootstrap(optional) | [React MUI component library](https://material-ui.com/) |

HTML, CSS and JS are all you need to contribute!

### Creating Your Own Component
Right now, users can contribute to the `Metrics` Page in `src/app/pages/Metrics/Metrics.js`

This should show up as `http://localhost:3000/metrics` in your browser.

If you look at the source-code you should see the `<Grid />` components, these are similar to the `row` and `col` classes used in bootstrap to make grids. See the [Grid Docs](https://material-ui.com/components/grid/) for more options.

#### Your grids need content
There are a few sample cards in `src/app/components/Cards/` you can use for references, I plan on creating a lot more.

Heres a basic card template:
- Create a new card under `/Cards/`
- Paste the following template
 ```jsx
 // SampleCard.js
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import classes from './Cards.module.scss';

const SampleCard = (props) => {
    const dashed = props.dashed;
    return (
        <Card
            variant="outlined"
            style={{ border: dashed && '2px dashed rgba(0, 0, 0, 0.12)' }}
        >
            <CardContent>
                {/* jsx comment - Your HTML goes here */}
                <p className={classes.paragraph}>Hello World</p>
            </CardContent>
        </Card>
    );
};

export default SampleCard;
```
- Add any styles to `src/app/components/Cards/Cards.module.scss`
- Import your component in to the `Metrics` page `src/app/pages/Metrics/Metrics.js`
  <br/>`import CounterCard from '../../components/Cards/SampleCard';`
- Add the wrap the component in a `<Grid />`
```jsx
<Grid container spacing={3} style={{ marginTop: 15 }}>
    <Grid item xs={12} md={8}>
        <SampleCard />
    </Grid>
</Grid>
```
- Save and your browser should auto-reload to show the updates!<br/><br/>
- That's it!
  
> ### Note <br/>
> Use the sample cards as a guide. `<CounterCard/>` and `<StateCounterCard/>` are great examples.
> <br /> <br/>The `<StateCounterCard/>` show how to establish and close a connection in a component, as well as subscribing to the state locally. This is good for now but I'll eventually move the subscriptions to a higher level so multiple components can sub to it.
> <br/> If anyone wants to do it, great. [React useContext Hook](https://reactjs.org/docs/hooks-reference.html#usecontext)



