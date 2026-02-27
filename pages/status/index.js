import useSWR from "swr";

async function fetchStatus() {
  const response = await fetch("/api/v1/status");
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status:</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );

  function UpdatedAt() {
    const { isLoading, data } = useSWR("status", fetchStatus, {
      refreshInterval: 2000, // Refresh every 2 seconds
    });

    let updatedAtText = "Carregando...";
    if (!isLoading && data) {
      updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
    }

    return <div>Última Atualização: {updatedAtText}</div>;
  }

  function DatabaseStatus() {
    const { isLoading, data } = useSWR("status", fetchStatus, {
      refreshInterval: 2000,
    });

    let databaseStatusInformationText = "Carregando...";
    if (!isLoading && data) {
      databaseStatusInformationText = (
        <>
          <div>Versão: {data.dependences.database.version}</div>
          <div>
            Conexões abertas: {data.dependences.database.opened_connections}
          </div>
          <div>
            Conexões máximas: {data.dependences.database.max_connections}
          </div>
        </>
      );

      return (
        <div>
          <h2>Banco de Dados:</h2>
          {databaseStatusInformationText}
        </div>
      );
    }
  }
}
