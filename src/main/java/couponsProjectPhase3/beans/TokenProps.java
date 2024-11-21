package couponsProjectPhase3.beans;

import couponsProjectPhase3.services.ClientService;

import java.util.Date;

public class TokenProps {
    private ClientService clientService;
    private Date lastTimeActive;

    public TokenProps(ClientService clientService) {
        this.clientService = clientService;
        this.lastTimeActive = new Date();
    }

    public ClientService getClientService() {
        return clientService;
    }

    public Date getLastTimeActive() {
        return lastTimeActive;
    }

    public void setLastTimeActive(Date lastTimeActive) {
        this.lastTimeActive = lastTimeActive;
    }

    @Override
    public String toString() {
        return "TokenProps{" +
                "clientService=" + clientService +
                ", lastTimeActive=" + lastTimeActive +
                '}';
    }
}
