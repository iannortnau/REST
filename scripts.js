$(function(){
    // Get filmes
    $('#get-button').on('click', function(){
        $.ajax({
            url: '/filmes/filmes',
            contentType: 'application/json',
            dataType:"json",

            success: function(response) {
                let tbodyEl = $('tbody');

                tbodyEl.html('');

                response.forEach(function(filme) {
                    tbodyEl.append('\<tr>\
                            <td class="id">' + filme.cod_filme + '</td>\
                            <td><input type="text" class="nome" value="' + filme.nome_filme + '"></td>\
                            <td><textarea type="text" class="descricao" value="">'+filme.descricao+'</textarea></td>\
                            <td><input type="text" class="nota" placeholder="Não possui descrição" value="' + filme.nota  + '"></td>\
                            <td>\
                                <button class="update-button">Avaliar</button>\
                                <button class="update-button">Atualizar</button>\
                                <button class="delete-button">Deletar</button>\
                            </td>\
                        </tr>\
                    ');
                });
            }
           
        });
    });

    // pega filmes recomensdados

    $('#get-button-recomendados').on('click', function(){
        $.ajax({
            url: '/filmes/filmes/r',
            contentType: 'application/json',
            dataType:"json",

            success: function(response) {
                let tbodyEl = $('tbody');

                tbodyEl.html('');

                response.forEach(function(filme) {
                    tbodyEl.append('\<tr>\
                            <td class="id">' + filme.cod_filme + '</td>\
                            <td><input type="text" class="nome" value="' + filme.nome_filme + '"></td>\
                            <td><textarea type="text" class="descricao" value="">'+filme.descricao+'</textarea></td>\
                            <td><input type="text" class="nota" placeholder="Não possui descrição" value="' + filme.nota  + '"></td>\
                            <td>\
                                <button class="update-button">Avaliar</button>\
                                <button class="update-button">Atualizar</button>\
                                <button class="delete-button">Deletar</button>\
                            </td>\
                        </tr>\
                    ');
                });
            }
           
        });
    });

    // Post filmes

    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        var createInputNome = $('#nome');
        var createInputDesc = $('#descricao');

        console.log(createInputNome.val());
        console.log(createInputDesc.val());

        $.ajax({
            url: '/filmes/filmes',
            method: 'POST',
            contentType: 'application/json',
            dataType:"json",
            data: JSON.stringify({ nome: createInputNome.val(), descricao: createInputDesc.val() }),
            success: function(response) {
                console.log(response);
            }
        });
    });

    //deleta filmes

    $('table').on('click', '.delete-button', function() {
        var coluna = $(this).closest('tr');
        var id = coluna.find('.id').text();

        $.ajax({
            url: '/filmes/filmes/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });

    // atualizar
    $('table').on('click', '.update-button', function() {
        var coluna = $(this).closest('tr');
        var id = coluna.find('.id').text();
        var nome = coluna.find('.nome').val();
        var desc = coluna.find('.descricao').val();
        var nota = coluna.find('.nota').val();


        $.ajax({
            url: '/filmes/filmes/' + id,
            method: 'PUT',
            contentType: 'application/json',
            dataType:"json",
            data: JSON.stringify({ nome: nome, descricao: desc, nota: nota}),
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });


});