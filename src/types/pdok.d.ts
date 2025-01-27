export namespace Pdok {
    interface Response {
        response: {
            numFound: number;
            start: number;
            maxScore: number;
            numFoundExact: boolean;
            docs: Address[];
        };
        highlighting: {
            [K: string]: {
                suggest: string[];
            };
        };
        spellcheck: {
            suggestions: (
                | string
                | {
                      numFound: number;
                      startOffset: number;
                      endOffset: number;
                      suggestion: string[];
                  }
            )[];
            collations: string[]; // I don't know what this is
        };
    }

    interface ErrorResponse {
        error: {
            code: number;
            msg: string;
            trace: string;
        };
    }

    interface Address {
        bron: string;
        woonplaatscode: string;
        type: string; // Literal?
        woonplaatsnaam: string;
        wijkcode: string;
        huis_nlt: string;
        openbaretuimetype: string; // Literal?
        gemeentecode: string;
        rdf_seealso: string;
        weergavenaam: string;
        suggest: string[];
        adrestype: string; // Literal?
        straatnaam_verkort: string;
        id: string;
        gekoppeld_perceel: string[];
        gemeentenaam: string;
        buurtcode: string;
        wijknaam: string;
        identificatie: string;
        openbareruimte_id: string;
        waterschapsnaam: string;
        provinciecode: string;
        postcode: string;
        provincienaam: string;
        centroide_ll: string;
        geometrie_ll: string;
        nummeraanduiding_id: string;
        waterschapscode: string;
        adresseerbaarobject_id: string;
        huisnummer: number;
        provincieafkorting: string;
        centroide_rd: string;
        geometrie_rd: string;
        straatnaam: string;
        shards: string;
        _version_: number;
        typesortering: number;
        sortering: number;
        shard: string;
    }
}
