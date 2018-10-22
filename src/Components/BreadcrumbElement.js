import React from 'react';
import { withRouter } from 'react-router-dom'
import { Breadcrumb } from 'semantic-ui-react';

const Item = withRouter(({ set, type, topic, history }) => {
    return(
        <Breadcrumb>
            <Breadcrumb.Section active={!set} link={set !== undefined} onClick={set && function () { if (set) history.push('/') }} >Project Pi</Breadcrumb.Section>
            {set && (
                <React.Fragment>
                    <Breadcrumb.Divider icon='right arrow' />
                    <Breadcrumb.Section active={!type} link={type !== undefined} onClick={type && function () { if (type) history.push(`/${set}`) }} >{set}</Breadcrumb.Section>
                    {type && (
                        <React.Fragment>
                            <Breadcrumb.Divider icon='right arrow' />
                            <Breadcrumb.Section active={!topic} link={topic !== undefined} onClick={topic && function () { if (topic) history.push(`/${set}/${type}`) }} >{type}</Breadcrumb.Section>
                            {topic && (
                                <React.Fragment>
                                    <Breadcrumb.Divider icon='right arrow' />
                                    <Breadcrumb.Section active={true} >{topic}</Breadcrumb.Section>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    )}
                </React.Fragment>
            )}
        </Breadcrumb>
    );
});
 
export default Item;

// {this.type && (
//     <Breadcrumb.Divider icon='right arrow' />
//     <Breadcrumb.Section link>{this.props.match.params.type}</Breadcrumb.Section>
//     <Breadcrumb.Divider icon='right arrow' />
//     <Breadcrumb.Section active>{this.props.match.params.topic}</Breadcrumb.Section>
// )}