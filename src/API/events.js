import{
    authPost,
    authFetch,
    authPut,
    authFormPut,
    authDelete,
    handleHttpResponse
}from './utils';

export default {
    /**
     * Create an event
     */
    create: (data: {}): Promise<any> =>
      authPost('/api/events', data).then(handleHttpResponse),
  
    /**
     * Fetches all events
     */
    getAll: (): Promise<any> =>
      authFetch('/api/events').then(handleHttpResponse),
  
    /**
     * Fetches an event
     */
    get: (id: string): Promise<any> =>
      authFetch(`/api/event/${id}`).then(handleHttpResponse),
  
    /**
     * Updates an event
     */
    update: (id: string, data: {}): Promise<any> =>
      authPut(`/api/events/${id}`, data).then(handleHttpResponse),
  
    /**
     * Delete an event
     */
    delete: (id: string): Promise<any> =>
      authDelete(`/api/events/${id}`).then(handleHttpResponse)
  };
  