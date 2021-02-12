import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Loader } from '../components/Loader';
import axios from "axios";
import moment from "moment";
import { useAuth } from '../helpers/Auth';
import { Accordion, Button, Card } from 'react-bootstrap';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faArchive, faEuroSign, faFileInvoiceDollar, faFilter, faShoppingBasket, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from '../constants';

library.add(faFilter, faFileInvoiceDollar, faShoppingBasket, faArchive, faEuroSign, faAddressCard, faUserTie);

export interface eventModel {
    id: number;
    customerId: number;
    orderId: number;
    userId: number;
    invoiceId: number;
    paymentId: number;
    projectId: number;
    type: EventType;
    dateTime: string;
    createdAt: string;
}
  
export enum EventType{
    QUOTE_ACCEPTED = 'QUOTE_ACCEPTED',
    QUOTE_SENT = 'QUOTE_SENT',
    CANCELLED = 'CANCELLED',
    INVOICE_SENT = 'INVOICE_SENT',
    INVOICE_PAID = 'INVOICE_PAID',
    ORDER_COMPLETE = 'ORDER_COMPLETE',
    DATA_CHANGED = 'DATA_CHANGED',
    COMMENT = 'COMMENT',
    PRODUCTS_RECEIVED = 'PRODUCTS_RECEIVED',
    DELIVERY = 'DELIVERY',
    INVOICE_IMPORT_COMPLETED = 'INVOICE_IMPORT_COMPLETED',
    ORDER_IMPORT_COMPLETED = 'ORDER_IMPORT_COMPLETED',
}

export const Events = () => {
    const [state, setState] = useState({
        events: null,
        filters: new Map(),
    })
    let auth = useAuth();

    let toggleFilter = (filter: string) => {
        setState({...state, filters: new Map(state.filters).set(filter, !state.filters.get(filter))});
    }
    
    let filtersToString = () : any => {
        let filters = Array.from(state.filters.keys()).filter((key) => state.filters.get(key))
        return filters.length > 0 ? { eventType: filters.join() } : {}
    }

    useEffect(() => {
        Object.values(EventType).map((type) => state.filters.set(type, true))
    }, [])

    // useEffect(() => {
    //     console.log("state", state)
    // }, [state])

    useEffect(() => {
        axios
            .get(
                API_URL+"/events",
                {
                    headers: { Authorization: `Bearer ${auth.user.token}` },
                    params: {
                        ...filtersToString()
                    }
                }
            )
            .then(response => {
                if (response.status === 200) {
                    setState({...state, events: response.data });
                }
            })
            .catch(error => {
                console.log("Events Error:", error);
            })
    }, [state.filters]);
    
    let typeClass = (type: EventType): string => {
        switch (type) {
          case EventType.QUOTE_ACCEPTED:
            return 'info';
          case EventType.CANCELLED:
            return 'danger';
          case EventType.INVOICE_SENT:
            return 'warning';
          case EventType.INVOICE_PAID:
            return 'success';
          case EventType.ORDER_COMPLETE:
            return 'primary';
          case EventType.COMMENT:
            return 'secondary';
          default:
            return '';
        }
    }
      
    let typeString = (type: EventType): string => {
        switch (type) {
          case EventType.QUOTE_ACCEPTED:
            return 'Offerte geaccepteerd';
          case EventType.QUOTE_SENT:
            return 'Offerte verstuurd';
          case EventType.CANCELLED:
            return 'Order afgemeld';
          case EventType.INVOICE_SENT:
            return 'Factuur verstuurd';
          case EventType.INVOICE_PAID:
            return 'Factuur betaald';
          case EventType.ORDER_COMPLETE:
            return 'Order afgerond';
          case EventType.DATA_CHANGED:
            return 'Order data aangepast';
          case EventType.COMMENT:
            return 'Commentaar toegevoegd';
          case EventType.PRODUCTS_RECEIVED:
            return 'Alle producten op voorraad';
          case EventType.DELIVERY:
            return 'Levering';
          case EventType.INVOICE_IMPORT_COMPLETED:
            return 'Facturen Import afgerond';
          case EventType.ORDER_IMPORT_COMPLETED:
            return 'Order Import afgerond';
          default:
            return '';
        }
    }

    let textColor = (type: EventType): string => {
        return typeClass(type) == '' ? 'black' : 'white'
    }

    return <div className="container">
        <Accordion>
            <div className="header-options float-right">
                <Accordion.Toggle as={Button} eventKey="0">
                    <FontAwesomeIcon icon="filter" /> Type Filter
                </Accordion.Toggle>
            </div>
            <h1 className="h3 mb-4 text-gray-800">Gebeurtenissen</h1>
            <Accordion.Collapse eventKey="0" className="shadow mb-4 border border-primary">
                <Card.Body>
                    <div className="btn-group-toggle">
                        {Object.values(EventType).map((type) => 
                            <label key={type} className={"btn mr-2 mb-1 " + (state.filters.get(type)? "btn-primary":"btn-outline-primary")} onClick={() => toggleFilter(type)}>
                                {typeString(type)}
                            </label>
                        )}
                    </div>
                </Card.Body>
            </Accordion.Collapse>
        </Accordion>
        
        {!state.events || state.events.length === 0 ? 
            <Loader content="Gebeurtenissen" /> :
            <div className="events">
                {state.events.map((item: eventModel) =>
                    <Card key={item.id} className={"mb-3"} /*border={typeClass(item.type)}*/ bg={typeClass(item.type)} text={textColor(item.type)} >
                        <Card.Header>{typeString(item.type)}</Card.Header>
                        <Card.Body>
                            {item.invoiceId && <Link to={"/invoices/" + item.invoiceId} className="btn btn-light btn-sm mr-1">
                                <FontAwesomeIcon icon="file-invoice-dollar" /> {"factuur: " + item.invoiceId}
                            </Link>}
                            {item.orderId && <Link to={"/orders/" + item.orderId} className="btn btn-light btn-sm mr-1">
                                <FontAwesomeIcon icon="shopping-basket" /> {"order: " + item.orderId}
                            </Link>}
                            {item.projectId && <Link to={"/projects/" + item.projectId} className="btn btn-light btn-sm mr-1">
                                <FontAwesomeIcon icon="archive" /> {"project: " + item.projectId}
                            </Link>}
                            {item.paymentId && <Link to={"/payments/" + item.paymentId} className="btn btn-light btn-sm mr-1">
                                <FontAwesomeIcon icon="euro-sign" /> {"Mollie betaling: " + item.paymentId}
                            </Link>}
                            {item.customerId && <Link to={"/customers/" + item.customerId} className="btn btn-light btn-sm mr-1">
                                <FontAwesomeIcon icon="address-card" /> {"klant: " + item.customerId}
                            </Link>}
                            {item.userId && <Link to={"/users/" + item.userId} className="btn btn-light btn-sm mr-1">
                                <FontAwesomeIcon icon="user-tie" /> {"gebruiker: " + item.userId}
                            </Link>}
                        </Card.Body>
                        <Card.Footer className={"text-" + textColor(item.type)}>{moment(item.dateTime).format("DD-MM-YYYY HH:mm:ss")}</Card.Footer>
                    </Card>
                )}
            </div>
        }
    </div>
}