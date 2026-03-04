import useSWR from "swr";

async function fetchStatus(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status Page</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchStatus, {
    refreshInterval: 2000,
  });

  let udpatedAtText = "Carregando...";

  if (!isLoading && data) {
    const updatedAt = new Date(data.updated_at);
    udpatedAtText = updatedAt.toLocaleString("pt-BR");
  }

  return <div>Última Atualização: {udpatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchStatus, {
    refreshInterval: 2000,
  });

  console.log(data);

  let databaseStatusInformation = "Carregando...";

  if (!isLoading && data) {
    databaseStatusInformation = (
      <>
        <div>Versão: {data.dependences.database.version}</div>
        <div>
          Conexões abertas: {data.dependences.database.opened_connections}
        </div>
        <div>Conexões máximas: {data.dependences.database.max_connections}</div>
      </>
    );
  }

  return (
    <>
      <h2>Banco de Dados</h2>
      {databaseStatusInformation}
    </>
  );
}
