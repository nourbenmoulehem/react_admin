// src/dataProvider.ts
import simpleRestProvider from "ra-data-simple-rest";
import { stringify }       from "query-string";
import { httpReact, API_BASE_URL } from "../src/api/http";

/* ------------------------------------------------------------------ */
/* 1.  httpClient : garde votre Axios + injection du Bearer token      */
/* ------------------------------------------------------------------ */
// const httpClient = async (url: string, options: any = {}) => {
//   const { data, status, headers: raw } = await httpReact.request({
//     url,
//     method : options.method  ?? "GET",
//     data   : options.body,
//     params : options.params,
//     headers: options.headers,
//   });

//   const hdr = new Headers();
//   Object.entries(raw).forEach(([k, v]) => hdr.append(k, String(v)));

//   return { status, headers: hdr, body: JSON.stringify(data ?? ""), json: data };
// };

// src/dataProvider.ts
const httpClient = async (url: string, options: any = {}) => {
  /* -------- inject JSON header if we have a body -------- */
  const hdrs: Record<string, string> = { ...(options.headers || {}) };
  if (options.body !== undefined && !hdrs["Content-Type"]) {
    hdrs["Content-Type"] = "application/json";
  }

  const { data, status, headers: raw } = await httpReact.request({
    url,
    method : options.method ?? "GET",
    data   : options.body,   // <- leave as-is, axios handles obj or string
    params : options.params,
    headers: hdrs,
    transformRequest: d => d          // don’t double-stringify
  });

  const hdr = new Headers();
  Object.entries(raw).forEach(([k, v]) => hdr.append(k, String(v)));

  return { status, headers: hdr, body: JSON.stringify(data ?? ""), json: data };
};


/* ------------------------------------------------------------------ */
/* 2.  Provider de base (garde toutes les méthodes par défaut)         */
/* ------------------------------------------------------------------ */
const base = simpleRestProvider(
  `${API_BASE_URL}/react`,
  httpClient,
  "X-Total-Count"
);

/* ------------------------------------------------------------------ */
/* 3.  Conversion spécifique pour getList                             */
/* ------------------------------------------------------------------ */
const convertListParams = ({ pagination, sort, filter }: any) => {
  const { page, perPage }   = pagination;
  const { field, order }    = sort;

  return stringify({
    _page   : page,
    _perPage: perPage,
    _sort   : field,
    _order  : order,
    ...filter,
  });
};

const handleVisits = (type: string, resource: string, params: any) => {
  const url = `${API_BASE_URL}/react/${resource}`;
  
  switch (type) {
    case 'GET_LIST':
      return httpClient(`${url}?${stringify(params)}`).then(({ json, headers }) => ({
        data: json,
        total: parseInt(headers.get('content-range')?.split('/').pop() || '0', 10),
      }));

    case 'GET_ONE':
      if (params.meta?.path) {
        return httpClient(`${API_BASE_URL}/gps/${params.meta.path}?${stringify(params.meta.params || {})}`);
      }
      return httpClient(`${url}/${params.id}`).then(({ json }) => ({ data: json }));

    case 'CREATE':
      return httpClient(url, {
        method: 'POST',
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({ data: json }));

    case 'UPDATE':
      return httpClient(`${url}/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({ data: json }));

    case 'DELETE':
      return httpClient(`${url}/${params.id}`, {
        method: 'DELETE',
      }).then(() => ({ data: params.previousData }));

    default:
      throw new Error(`Unsupported fetch action type ${type}`);
  }
};

export const dataProvider = {
  ...base,

  getList: (resource: string, params: any) => {
    const query = convertListParams(params);
    const url   = `${API_BASE_URL}/react/${resource}?${query}`;

    if (resource === "activites") {
      const secteurId = params.filter?.secteur;

      /* 1-a: NO secteur chosen yet → return empty list, skip HTTP call */
      if (!secteurId) {
        return Promise.resolve({ data: [], total: 0 });
      }

      /* 1-b: secteur chosen → call backend */
      const url = `${API_BASE_URL}/react/secteurs/${secteurId}/activites`;
      return httpClient(url).then(({ json }) => ({
        data : json,          // [{ id, name }]
        total: json.length
      }));
    }

    

    return httpClient(url).then(({ json, headers }) => ({
      data : json,
      total: parseInt(headers.get("X-Total-Count") || "0", 10),
    }));
  },

  getOne: (resource: string, params: any) => {
    if(resource === "gps" && params.meta?.path) {
      const url = `${API_BASE_URL}/react/gps/${params.id}/${params.meta.path}`;

      console.log("🚀 ~ url:", url)
      
      return httpClient(url, { params: params.meta.params })
        .then(({ json }) => ({ 
          data: { 
            id: params.id, 
            availability: json 
          } 
        }));
    }

    if (resource === "activites") {
      const url =
        `${API_BASE_URL}/react/secteurs/activites/${params.id}`;

      return httpClient(url)
        .then(({ json }) => ({ data: json }));
    }

    

    return base.getOne(resource, params);
  },

  getMany: (resource: string, params: any) => {
    if (resource === "activites") {
    return Promise.all(
      params.ids.map((id: number) =>
        httpClient(`${API_BASE_URL}/react/secteurs/activites/${id}`)
      )
    ).then(responses => ({ data: responses.map(r => r.json) }));
  }
    return base.getMany(resource, params);   // other resources
  },

  // Add a custom method for availability
  getAvailability: (gpId: string, date: string) => {
    const url = `${API_BASE_URL}/react/gps/${gpId}/availability`;
    return httpClient(url, { params: { date } })
      .then(({ json }) => json);
  },

  update: (resource: string, params: any) => {
    if (resource === "prospects" && params.meta?.path) {
      const url  = `${API_BASE_URL}/react/${resource}/${params.meta.path}`;

      return httpReact.request({
        url,
        method: "PATCH",
        data  : params.meta.body || {},
        headers: { "Content-Type": "application/json" }
      })
      .then(({ data }) => ({ data: data ?? params.previousData }));
    }

    if (resource === 'visits') {
        return handleVisits('GET_LIST', resource, params);
    }

    return base.update(resource, params);
  },

  // create: (resource: string, params: any) => {
  //   if (resource === 'visits') {
  //     return handleVisits('CREATE', resource, params);
  //   }

  //   return base.create(resource, params);
  // }


  create: (resource: string, params: any) => {
  if (resource === "visits") {
    return httpReact.request({
      url    : "/visits",
      method : "POST",
      data   : JSON.stringify(params.data),          
      headers: { "Content-Type": "application/json" } 
      , transformRequest: (d) => d
    }).then(({ data }) => ({ data }));
  }
  return base.create(resource, params);
},

};