import React, { Component } from 'react';
import { Button, Input, Header, Table } from 'semantic-ui-react';

export class Campaign extends Component {


    STATUS = {
        ongoing: 0,
        failed: 1,
        succeeded: 2,
        paidOut: 3
    }

    state = {
        campaign: {
            name: 'N/A',
            targetAmount: 0,
            totalCollected: 0,
            campaignFinished: false,
            deadline: new Date(0),
            isBeneficiary: false,
            state: ''
        },
        contributionAmount: '0'
    }

    constructor(props) {
        super(props)

        this.onContribute = this.onContribute.bind(this)
    }

    async componentDidMount() {
        const currentCampaign = this.getCampaign(this.getCampaignAddress())
        this.setState({
            campaign: currentCampaign
        })
    }

    getCampaignAddress() {
        return this.props.match.params.address
    }

    getCampaign(address) {
        return {
            name: 'Contract name',
            targetAmount: 100,
            totalCollected: 50,
            campaignFinished: false,
            deadline: new Date(),
            isBeneficiary: true,
            //AQUI FALTA
            state: this.STATUS.ongoing
        }
    }

    render() {
        const ROWS = [
            { rowName: "Name", rowAction: this.state.campaign.name },
            { rowName: "Target Amount", rowAction: this.state.campaign.targetAmount },
            { rowName: "Total Collected", rowAction: this.state.campaign.totalCollected },
            { rowName: "Has finished", rowAction: this.state.campaign.campaignFinished.toString() },
            { rowName: "Deadline", rowAction: this.state.campaign.deadline.toString() },
            { rowName: "I am beneficiary", rowAction: this.state.campaign.isBeneficiary.toString() },
            { rowName: "Contract state", rowAction: this.state.campaign.state }
        ]

        return (
            <div>
                <Table celled padded color="teal" striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Value</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {ROWS.map((row) => (
                        <Table.Row>
                        <Table.Cell singleLine>
                            {row.rowName}
                        </Table.Cell>
                        <Table.Cell singleLine>
                            {row.rowAction}
                        </Table.Cell>
                    </Table.Row>
                        ))}
                        
                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan="2">
                                {this.campaignInteractionSection()}
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>

            </div>
        );
    }

    campaignInteractionSection() {
        if (this.state.campaign.campaignFinished) {
            return this.postCampaignInterface()
        }
        else {
            return this.contribeInterface()
        }
    }

    postCampaignInterface() {
        if (this.state.campaign.state == this.STATUS.ongoing) {
            return <div>
                <Button type='submit' positive> Finish campaign</Button>
            </div>
        }
        if (this.state.campaign.state == this.STATUS.succeeded && this.state.campaign.isBeneficiary === true) {
            return <div>
                <Button type="submit" negative>Collect founds</Button>
            </div>
        }

        if (this.state.campaign.state == this.STATUS.failed) {
            return <div>
                <Button type='submit' negative>Refund</Button>
            </div>
        }
    }

    contribeInterface() {
        return <div>
            <Input
                action={{
                    color: 'teal',
                    content: 'Contribute',
                    onClick: this.onContribute
                }}
                actionPosition="left"
                label='ETH'
                labelPosition='right'
                placeholder='1'
                onChange={(e) => this.setState({ contributionAmount: e.target.value })}
            />
        </div>
    }

    onContribute(event) {
        alert(`Contributing ${this.state.contributionAmount} to a contract`)
    }
}